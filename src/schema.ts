import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity()
export class CricketTeam {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image_path: string;

  @OneToMany(() => CricketPlayer, player => player.team)
  players: CricketPlayer[];

  constructor(id: string, name: string, image_path: string) {
    this.id = id;
    this.name = name;
    this.image_path=image_path;
  }
}

@Entity()
export class CricketPlayer {
  @PrimaryColumn()
  id: string;

  @Column()
  teamId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  position: string;

  @ManyToOne(() => CricketTeam, team => team.players)
  @JoinColumn({ name: 'teamId' })
  team: CricketTeam;

  @Column()
  image_path: string;

  @OneToMany(() => PlayerPerformance, performance => performance.player)
  performances: PlayerPerformance[];

  constructor(
    id: string,
    teamId: string,
    firstName: string,
    lastName: string,
    position: string,
    image_path: string
  ) {
    this.id = id;
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.image_path=image_path
    }
}

@Entity()
export class CricketMatch {
    @PrimaryColumn()
    id: string;

    @Column()
    homeTeamId: string;

    @Column()
    awayTeamId: string;

    @Column({ type: 'datetime' })
    matchDate: Date;

    @ManyToOne(() => CricketTeam)
    @JoinColumn({ name: 'homeTeamId' })
    homeTeam: CricketTeam;

    @ManyToOne(() => CricketTeam)
    @JoinColumn({ name: 'awayTeamId' })
    awayTeam: CricketTeam;

    @OneToOne(() => CricketPool, pool => pool.match)
    pool: CricketPool | null;

    @OneToMany(() => PlayerPerformance, performance => performance.match)
    performances: PlayerPerformance[];

    constructor(
        id: string,
        homeTeamId: string,
        awayTeamId: string,
        matchDate: Date
    ) {
        this.id = id;
        this.homeTeamId = homeTeamId;
        this.awayTeamId = awayTeamId;
        this.matchDate = matchDate;
        this.pool = null;
    }
}

@Entity()
export class CricketPool {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;

    @Column()
    cricketMatchId: string;

    @OneToOne(() => CricketMatch)
    @JoinColumn({ name: 'cricketMatchId' })
    match: CricketMatch;

    constructor(id: string, cricketMatchId: string) {
        this.id = id;
        this.cricketMatchId = cricketMatchId;
    }
}

@Entity()
export class PlayerPerformance {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;
  
    @Column()
    cricketMatchId: string;
  
    @Column()
    cricketPlayerId: string;
  
    @Column()
    runs: number;
  
    @Column()
    wickets: number;
  
    @Column()
    catches: number;

    @Column()
    points: number;
  
    @ManyToOne(() => CricketMatch, match => match.performances)
    @JoinColumn({ name: 'cricketMatchId' })
    match: CricketMatch;
  
    @ManyToOne(() => CricketPlayer, player => player.performances)
    @JoinColumn({ name: 'cricketPlayerId' })
    player: CricketPlayer;
  
    constructor(
      cricketMatchId: string,
      cricketPlayerId: string,
      runs: number = 0,
      wickets: number = 0,
      catches: number = 0,
      points: number =0,
    ) {
      this.cricketMatchId = cricketMatchId;
      this.cricketPlayerId = cricketPlayerId;
      this.runs = runs;
      this.wickets = wickets;
      this.catches = catches;
      this.points= points;
    }
    

    
}


@Entity()
export class BetsOptions {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;
  
    @Column()
    betName: string;
  
    constructor(
        betName: string,
    ) {
      this.betName = betName;
    }
}

@Entity('cricket_special_bet')
export class SpecialBet {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;
  
    @Column()
    specialBetId: string;
  
    @Column()
    playerId: string;
  
  s
  @ManyToOne(() => BetsOptions)
  @JoinColumn({ name: 'specialBetId' })
  specialBet: BetsOptions;

  @ManyToOne(() => CricketPlayer)
  @JoinColumn({ name: 'playerId' })
  player: CricketPlayer;
  
    constructor(
        specialBetId: string,
        playerId: string,
    ) {
      this.specialBetId = specialBetId;
      this.playerId = playerId;

    }
}


@Entity()
export class CricketPlayerHistorial {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  playerId: string;

  @Column()
  runs: number;

  @Column()
  wickets: number;

  @Column()
  catches: number;

  @Column()
  points: number;

  @ManyToOne(() => CricketPlayer)
  @JoinColumn({ name: 'playerId' })
  player: CricketPlayer;

  constructor(
    playerId: string,
    runs: number = 0,
    wickets: number = 0,
    catches: number = 0,
    points: number = 0
  ) {
    this.playerId = playerId;
    this.runs = runs;
    this.wickets = wickets;
    this.catches = catches;
    this.points = points;
  }
}